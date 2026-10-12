<?php
/**
 * Shalom Music Studios - Songs API Backend
 * Manages song uploads, metadata storage, and deletions on the server.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = __DIR__ . '/uploads';
$songsDir = $dataDir . '/audio';
$coversDir = $dataDir . '/covers';
$dataFile = $dataDir . '/songs.json';

// Ensure directories exist
if (!is_dir($dataDir)) @mkdir($dataDir, 0755, true);
if (!is_dir($songsDir)) @mkdir($songsDir, 0755, true);
if (!is_dir($coversDir)) @mkdir($coversDir, 0755, true);

// Initialize songs file if missing
if (!file_exists($dataFile)) {
    file_put_contents($dataFile, json_encode([], JSON_PRETTY_PRINT));
}

function getSongsList($dataFile) {
    if (!file_exists($dataFile)) return [];
    $raw = @file_get_contents($dataFile);
    if (!$raw) return [];
    $decoded = json_decode($raw, true);
    return is_array($decoded) ? $decoded : [];
}

function saveSongsList($dataFile, $list) {
    return file_put_contents($dataFile, json_encode(array_values($list), JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
}

$method = $_SERVER['REQUEST_METHOD'];

// 1. GET: Fetch all active songs
if ($method === 'GET') {
    header("Content-Type: application/json; charset=UTF-8");
    $songs = getSongsList($dataFile);
    echo json_encode(["success" => true, "data" => $songs]);
    exit();
}

// 2. DELETE: Remove song
if ($method === 'DELETE' || ($method === 'POST' && isset($_GET['action']) && $_GET['action'] === 'delete')) {
    header("Content-Type: application/json; charset=UTF-8");
    $id = isset($_GET['id']) ? trim($_GET['id']) : '';
    if (!$id) {
        $body = json_decode(file_get_contents('php://input'), true);
        $id = isset($body['id']) ? trim($body['id']) : '';
    }

    if (!$id) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Song ID required"]);
        exit();
    }

    $songs = getSongsList($dataFile);
    $filtered = [];
    foreach ($songs as $s) {
        if ($s['id'] === $id) {
            // Delete files if local to uploads directory
            if (!empty($s['audioUrl']) && strpos($s['audioUrl'], '/uploads/audio/') !== false) {
                $base = basename($s['audioUrl']);
                @unlink($songsDir . '/' . $base);
            }
            if (!empty($s['coverUrl']) && strpos($s['coverUrl'], '/uploads/covers/') !== false) {
                $base = basename($s['coverUrl']);
                @unlink($coversDir . '/' . $base);
            }
        } else {
            $filtered[] = $s;
        }
    }

    saveSongsList($dataFile, $filtered);
    echo json_encode(["success" => true, "message" => "Song deleted successfully", "data" => $filtered]);
    exit();
}

// 3. POST: Upload new song or update existing song
if ($method === 'POST') {
    header("Content-Type: application/json; charset=UTF-8");

    $id = isset($_POST['id']) && trim($_POST['id']) !== '' ? trim($_POST['id']) : 'song-' . time() . '-' . substr(md5(uniqid(rand(), true)), 0, 6);
    $title = isset($_POST['title']) ? trim($_POST['title']) : '';
    $artist = isset($_POST['artist']) ? trim($_POST['artist']) : '';
    $album = isset($_POST['album']) ? trim($_POST['album']) : '';
    $genre = isset($_POST['genre']) ? trim($_POST['genre']) : 'Gospel';
    $copyright = isset($_POST['copyright']) ? trim($_POST['copyright']) : '© 2026 Shalom Music Studios';
    $description = isset($_POST['description']) ? trim($_POST['description']) : '';
    $duration = isset($_POST['duration']) ? floatval($_POST['duration']) : 0;
    $featuredInClientsSay = isset($_POST['featuredInClientsSay']) ? ($_POST['featuredInClientsSay'] === 'true' || $_POST['featuredInClientsSay'] === '1' || $_POST['featuredInClientsSay'] === true) : false;
    $clientSayOrder = isset($_POST['clientSayOrder']) ? intval($_POST['clientSayOrder']) : 1;
    $clientSayQuote = isset($_POST['clientSayQuote']) ? trim($_POST['clientSayQuote']) : '';
    $clientSayLocation = isset($_POST['clientSayLocation']) ? trim($_POST['clientSayLocation']) : '';
    $existingAudioUrl = isset($_POST['existingAudioUrl']) ? trim($_POST['existingAudioUrl']) : '';
    $existingCoverUrl = isset($_POST['existingCoverUrl']) ? trim($_POST['existingCoverUrl']) : '';

    $songs = getSongsList($dataFile);
    $existingIndex = -1;
    foreach ($songs as $i => $s) {
        if ($s['id'] === $id) {
            $existingIndex = $i;
            break;
        }
    }

    $audioUrl = $existingAudioUrl;
    $fileName = '';
    $fileSize = 0;
    $fileFormat = 'mp3';

    // Handle Audio File Upload
    if (isset($_FILES['audioFile']) && $_FILES['audioFile']['error'] === UPLOAD_ERR_OK) {
        $origName = $_FILES['audioFile']['name'];
        $ext = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
        if (!in_array($ext, ['mp3', 'm4a', 'wav'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Invalid audio format"]);
            exit();
        }

        $newAudioName = $id . '-' . time() . '.' . $ext;
        $targetPath = $songsDir . '/' . $newAudioName;
        if (move_uploaded_file($_FILES['audioFile']['tmp_name'], $targetPath)) {
            $audioUrl = '/uploads/audio/' . $newAudioName;
            $fileName = $origName;
            $fileSize = filesize($targetPath);
            $fileFormat = $ext;
        }
    }

    // Handle Cover Image Upload
    $coverUrl = $existingCoverUrl;
    if (isset($_FILES['coverFile']) && $_FILES['coverFile']['error'] === UPLOAD_ERR_OK) {
        $coverOrig = $_FILES['coverFile']['name'];
        $ext = strtolower(pathinfo($coverOrig, PATHINFO_EXTENSION));
        $newCoverName = 'cover-' . $id . '-' . time() . '.' . $ext;
        $targetCoverPath = $coversDir . '/' . $newCoverName;
        if (move_uploaded_file($_FILES['coverFile']['tmp_name'], $targetCoverPath)) {
            $coverUrl = '/uploads/covers/' . $newCoverName;
        }
    } elseif (isset($_POST['coverUrl']) && !empty($_POST['coverUrl']) && strpos($_POST['coverUrl'], 'data:image') === 0) {
        // Handle Base64 cover photo
        $parts = explode(',', $_POST['coverUrl']);
        if (count($parts) === 2) {
            $imageData = base64_decode($parts[1]);
            $newCoverName = 'cover-' . $id . '-' . time() . '.jpg';
            file_put_contents($coversDir . '/' . $newCoverName, $imageData);
            $coverUrl = '/uploads/covers/' . $newCoverName;
        }
    }

    $songRecord = [
        'id' => $id,
        'title' => $title,
        'artist' => $artist,
        'album' => $album,
        'genre' => $genre,
        'copyright' => $copyright,
        'description' => $description,
        'coverUrl' => $coverUrl,
        'audioUrl' => $audioUrl,
        'duration' => $duration,
        'fileSize' => $fileSize,
        'fileName' => $fileName,
        'fileFormat' => $fileFormat,
        'featuredInClientsSay' => $featuredInClientsSay,
        'clientSayOrder' => $clientSayOrder,
        'clientSayQuote' => $clientSayQuote,
        'clientSayLocation' => $clientSayLocation,
        'createdAt' => $existingIndex >= 0 && isset($songs[$existingIndex]['createdAt']) ? $songs[$existingIndex]['createdAt'] : round(microtime(true) * 1000),
        'updatedAt' => round(microtime(true) * 1000)
    ];

    if ($existingIndex >= 0) {
        $songs[$existingIndex] = array_merge($songs[$existingIndex], $songRecord);
    } else {
        array_unshift($songs, $songRecord);
    }

    saveSongsList($dataFile, $songs);
    echo json_encode(["success" => true, "data" => $songRecord]);
    exit();
}

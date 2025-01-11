<?php
// Serve React app
if (file_exists(__DIR__ . '/../frontend/build/index.html')) {
    include __DIR__ . '/../frontend/build/index.html';
} else {
    echo 'React app not found.';
}
?>
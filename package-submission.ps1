$ErrorActionPreference = 'Stop'
$files = @(
  'index.html', 'styles.css', 'app.js', 'server.cjs', 'crowd-store.cjs',
  'Start Glide.cmd', 'README.md', 'SUBMISSION.md',
  'crowd-store.test.cjs', 'crowd-ui.test.cjs', 'vendor', 'assets/glide-wing.png', 'BRAND.md'
)
$paths = $files | ForEach-Object { Join-Path $PSScriptRoot $_ }
foreach ($path in $paths) {
  if (-not (Test-Path -LiteralPath $path)) { throw "Missing submission file: $path" }
}
$output = Join-Path $PSScriptRoot 'Glide-Submission.zip'
# Stage the approved asset with its directory structure; keep unused concepts out.
$stage = Join-Path ([System.IO.Path]::GetTempPath()) ('glide-submission-' + [guid]::NewGuid())
New-Item -ItemType Directory -Path (Join-Path $stage 'assets') -Force | Out-Null
foreach ($file in $files) {
  Copy-Item -LiteralPath (Join-Path $PSScriptRoot $file) -Destination (Join-Path $stage $file) -Recurse
}
Compress-Archive -Path (Join-Path $stage '*') -DestinationPath $output -Force
Write-Output "Submission package: $output"

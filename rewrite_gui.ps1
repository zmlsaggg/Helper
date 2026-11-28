$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8
$lines = $content.Length
"Total lines: $lines"

# Find all lines that are "  };" or "  }" or "  }" or "  }" (function endings)
# to find good split points
Write-Host "=== Function endings ==="
for ($i = 0; $i -lt $lines; $i++) {
    $trimmed = $content[$i].Trim()
    if ($trimmed -eq '};' -or $trimmed -eq '}' -or $trimmed -eq '  };' -or $trimmed -eq '  }') {
        # Check if this is a top-level function ending (indented with 2 spaces)
        if ($content[$i].StartsWith('  }')) {
            Write-Host "Line $($i+1): '$($content[$i])'"
        }
    }
}
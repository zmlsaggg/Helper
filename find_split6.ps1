$content = Get-Content Source/UI/Panorama/CreateGUI.js -Encoding UTF8

# Show all lines with "};", "}", etc. between lines 759-1074
for ($i = 758; $i -lt 1074; $i++) {
    $line = $content[$i].Trim()
    if ($line -eq '};' -or $line -eq '}' -or $line -eq '  };' -or $line -eq '  }' -or $line -eq '    }' -or $line -eq '    };') {
        Write-Host "Line $($i+1): '$($content[$i])'"
    }
}
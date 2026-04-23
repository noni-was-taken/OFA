$dir = "c:\Users\User\Documents\Web Development\OFA\philnits-vault\2025"

# Check FE-S files
Write-Output "=== FE-S FILES ==="
for ($i = 1; $i -le 60; $i++) {
    $file = Join-Path $dir "2025A_FE-S_$i.md"
    if (Test-Path $file) {
        $lines = Get-Content $file
        $foundQuestion = $false
        $answer = "NO_ANSWER_FOUND"
        for ($j = 0; $j -lt $lines.Count; $j++) {
            if ($lines[$j].Trim() -eq '?') {
                $foundQuestion = $true
                # Look at the next non-empty line for the answer
                for ($k = $j + 1; $k -lt $lines.Count; $k++) {
                    $nextLine = $lines[$k].Trim()
                    if ($nextLine -ne '') {
                        if ($nextLine -match '^([a-dA-D])\)') {
                            $answer = $Matches[1].ToUpper()
                        }
                        break
                    }
                }
                break
            }
        }
        Write-Output "2025A_FE-S_${i}: $answer"
    } else {
        Write-Output "2025A_FE-S_${i}: FILE_MISSING"
    }
}

Write-Output ""
Write-Output "=== FE-A FILES ==="
for ($i = 1; $i -le 60; $i++) {
    $file = Join-Path $dir "2025A_FE-A_$i.md"
    if (Test-Path $file) {
        $lines = Get-Content $file
        $foundQuestion = $false
        $answer = "NO_ANSWER_FOUND"
        for ($j = 0; $j -lt $lines.Count; $j++) {
            if ($lines[$j].Trim() -eq '?') {
                $foundQuestion = $true
                for ($k = $j + 1; $k -lt $lines.Count; $k++) {
                    $nextLine = $lines[$k].Trim()
                    if ($nextLine -ne '') {
                        if ($nextLine -match '^([a-dA-D])\)') {
                            $answer = $Matches[1].ToUpper()
                        }
                        break
                    }
                }
                break
            }
        }
        Write-Output "2025A_FE-A_${i}: $answer"
    } else {
        Write-Output "2025A_FE-A_${i}: FILE_MISSING"
    }
}

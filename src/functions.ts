/*
 *   Copyright (c) 2024 fbongcam
 *   All rights reserved.
 */

export function convertLines(text: string) {
    text = text.trim();
            // Split lines
            const lines = text.split('\n');
            console.log(lines);
            for (let i=0; i < lines.length; i++) {
                if (lines[i].includes('"') || lines[i].includes('\'')) {
                    lines[i] = lines[i].replace(/"/g, '\\"');
                    lines[i] = lines[i].replace(/'/g, "\\'");
                }
                lines[i] = `"${lines[i]}"`;
                
                if (i !== lines.length - 1) {
                    lines[i] += ',';
                }
            }
            return '{\n' + lines.join('\n') + '\n}';
}
#!/bin/bash

# /u01/servisoftsFiles/drive//serp/f894ea35-5ad1-4b61-a2d0-9294965be169//Screen Recording 2026-05-23 at 1.14.10 AM.mov

key="660a5a6b-b17d-4491-bafe-523e3f27aa66"

file_path="/u01/servisoftsFiles/drive/serp/f894ea35-5ad1-4b61-a2d0-9294965be169/"

find "$file_path" -type f | while read file; do
    uuid=$(getfattr --only-values -n user.key "$file" 2>/dev/null)

    # echo "Archivo: $file, UUID: $uuid"
    if [ "$uuid" = "$key" ]; then
        echo "Encontrado: $file"
    fi
done
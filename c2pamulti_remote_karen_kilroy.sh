# Path to c2patool
c2paToolPath="c2patool"  # Assuming c2patool is in your PATH

# Directory containing the images to be signed
filesDirectory="$(pwd)/images"

# Path to the manifest file
manifestFile="$(pwd)/karen_kilroy_paybotsai.json"

# Output directories for signed images and thumbnails
outputDirectory="$(pwd)/vip/karen_kilroy/paybotsai/PNG"
thumbnailDirectory="$(pwd)/vip/karen_kilroy/paybotsai/PNG/thumbnails"

# Base URL for remote c2pa manifest storage
c2paRemoteBaseURL="https://my.file.baby/vip/karen_kilroy/paybotsai/PNG/"

# Create the output and thumbnail directories if they don't exist
# mkdir -p "$outputDirectory"
mkdir -p "$thumbnailDirectory"

# Loop through each file in the images directory
for file in "$filesDirectory"/*
do
    # Extract filename from path
    filename=$(basename "$file")

    # Remove file extension and add .c2pa
    baseFilename="${filename%.*}.c2pa"

    # Construct remote manifest URL
    c2paRemoteURL="$c2paRemoteBaseURL/$baseFilename"

    echo "Generating thumbnail for: $filename"
    # Generate thumbnail (adjust size as needed, e.g., 100x100 pixels)
    convert "$file" -resize 100x100 "$thumbnailDirectory/$filename"

    echo "Signing: $filename"
    # Construct the absolute path for the output file
    outputFile="$outputDirectory/$filename"

    # Run c2patool to sign the file with the manifest
    $c2paToolPath "$file" -s -r "$c2paRemoteURL" -m "$manifestFile" -o "$outputFile" -f

    # Check for error in last command
    if [ $? -eq 0 ]; then
        echo "Successfully signed: $filename"
    else
        echo "Failed to sign: $filename"
    fi
done


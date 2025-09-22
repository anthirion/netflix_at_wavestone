$USERNAME = "netflix-db"
$DBNAME = "netflix-db"

$files = @("episodes.json", "scriptwriters.json", "series.json")

$URI = Read-Host "Please enter Cosmos DB host (see in Azure Portal)"
$PORT = Read-Host "Please enter Cosmos DB port (see in Azure Portal)"
$PASSWORD = Read-Host "Please enter primary password string from the Azure Portal" -MaskInput

foreach ($file in $files) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($file)
    $collection = $baseName.Substring(0,1).ToUpper() + $baseName.Substring(1)

    mongoimport --host $URI `
        --ssl `
        --port $PORT `
        --username $USERNAME `
        --password $PASSWORD `
        --db $DBNAME `
        --collection $collection `
        --type json `
        --writeConcern="{w:0}" `
        --file $file `
        --jsonArray
}
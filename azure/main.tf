# resource "azurerm_cosmosdb_account" "netflix-db" {
#   name                = "netflix-db"
#   location            = local.region
#   resource_group_name = local.rg_name
#   offer_type          = "Standard"
#   kind                = "MongoDB"

#   free_tier_enabled          = true
#   automatic_failover_enabled = false

#   consistency_policy {
#     consistency_level       = "BoundedStaleness"
#     max_interval_in_seconds = 300
#     max_staleness_prefix    = 100000
#   }

#   # primary region
#   geo_location {
#     location          = local.region
#     failover_priority = 0
#   }
# }

resource "azurerm_container_group" "netflix-api" {
  name                = "netflix-api"
  location            = local.region
  resource_group_name = local.rg_name
  ip_address_type     = "Public"
  os_type             = "Linux"

  container {
    name   = "netflix-api-server"
    image  = "ghcr.io/anthirion/netflix_at_wavestone:latest"
    cpu    = "1"
    memory = "1"
    
    environment_variables = {
      DATABASE_URL = "mongodb://netflix-db:27017"
    }

    ports {
      port     = 443
      protocol = "TCP"
    }
  }

  image_registry_credential {
      server   = "index.docker.io"
      username = var.dockerhub_username
      password = var.dockerhub_token
    }


  container {
    name   = "netflix-db"
    image  = "mongo:noble"
    cpu    = "1"
    memory = "1"

    ports {
      port     = 27017
      protocol = "TCP"
    }
  }
}
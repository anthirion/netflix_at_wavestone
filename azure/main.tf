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


resource "azurerm_log_analytics_workspace" "netflix-logs" {
  name                = "netflix-logs"
  location            = local.region
  resource_group_name = local.rg_name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

resource "azurerm_container_group" "netflix-api" {
  name                = "netflix-api"
  location            = local.region
  resource_group_name = local.rg_name
  ip_address_type     = "Public"
  os_type             = "Linux"

  diagnostics {
    log_analytics {
      log_type = "ContainerInsights"
      workspace_id = azurerm_log_analytics_workspace.netflix-logs.workspace_id
      workspace_key = azurerm_log_analytics_workspace.netflix-logs.primary_shared_key
    }
  }

  container {
    name   = "netflix-api-server"
    image  = "ghcr.io/anthirion/netflix_at_wavestone/api_server:latest"
    cpu    = "1"
    memory = "1"
    
    environment_variables = {
      DATABASE_URL = "mongodb://netflix-db:27017"
    }

    ports {
      port     = 8080
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
    image  = "ghcr.io/anthirion/netflix_at_wavestone/custom_mongo:latest"
    cpu    = "1"
    memory = "1"

    ports {
      port     = 27017
      protocol = "TCP"
    }
  }
}
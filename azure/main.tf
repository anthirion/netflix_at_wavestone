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
  dns_name_label      = "netflix-at-wavestone"
  os_type             = "Linux"

  diagnostics {
    log_analytics {
      workspace_id  = azurerm_log_analytics_workspace.netflix-logs.workspace_id
      workspace_key = azurerm_log_analytics_workspace.netflix-logs.primary_shared_key
    }
  }

  container {
    name   = "netflix-api-server"
    image  = "ghcr.io/anthirion/netflix_at_wavestone/api_server:latest"
    cpu    = "1"
    memory = "1"

    environment_variables = {
      DATABASE_URL = "mongodb://${var.mongo_user}:${var.mongo_password}@localhost:27017/netflix"
    }

    ports {
      port     = 80
      protocol = "TCP"
    }
  }

  container {
    name   = "netflix-db"
    image  = "ghcr.io/anthirion/netflix_at_wavestone/custom_mongo:latest"
    cpu    = "1"
    memory = "1"

    environment_variables = {
      MONGO_USER     = "${var.mongo_user}"
      MONGO_PASSWORD = "${var.mongo_password}"
    }

    ports {
      port     = 27017
      protocol = "TCP"
    }
  }
}
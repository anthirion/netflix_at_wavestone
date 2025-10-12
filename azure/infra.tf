locals {
  rg_name = "antoine-thirion26294"
  region  = "West Europe"
}

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.27.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}

  subscription_id = "92c9bea0-3c7c-4dda-b314-2c97e654fb1b"
}

##########################  RESOURCES ##########################
resource "azurerm_cosmosdb_account" "netflix-db" {
  name                = "netflix-db"
  location            = local.region
  resource_group_name = local.rg_name
  offer_type          = "Standard"
  kind                = "MongoDB"

  free_tier_enabled          = true
  automatic_failover_enabled = false

  consistency_policy {
    consistency_level       = "BoundedStaleness"
    max_interval_in_seconds = 300
    max_staleness_prefix    = 100000
  }

  # primary region
  geo_location {
    location          = local.region
    failover_priority = 0
  }
}

resource "azurerm_container_group" "netflix-api" {
  name                = "netflix-api"
  location            = local.region
  resource_group_name = local.rg_name
  ip_address_type     = "Public"
  dns_name_label      = "netflix_api_server"
  os_type             = "Linux"

  container {
    name   = "netflix-api-server"
    image  = "ghcr.io/anthirion/netflix_at_wavestone:latest"
    cpu    = "0.5"
    memory = "1.5"

    ports {
      port     = 443
      protocol = "TCP"
    }
  }
}
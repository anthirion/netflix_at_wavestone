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

resource "azurerm_service_plan" "netflix-api-service-plan" {
  name                = "netflix-api-service-plan"
  resource_group_name = local.rg_name
  location            = local.region
  os_type             = "Linux"
  sku_name            = "B1"
}

# App service resource
resource "azurerm_linux_web_app" "netflix-api-server" {
  name                = "netflix-api-server"
  resource_group_name = local.rg_name
  location            = azurerm_service_plan.netflix-api-service-plan.location
  service_plan_id     = azurerm_service_plan.netflix-api-service-plan.id

  site_config {}
}
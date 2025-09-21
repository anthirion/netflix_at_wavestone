terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.37.0"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)
  project     = var.project
  region      = var.region
}

resource "google_compute_network" "vpc_network" {
  project = var.project
  name    = "private-network"
}

resource "google_cloud_run_v2_service" "apiserver" {
  name                 = "netflix-api-server"
  location             = var.region
  deletion_protection  = false
  ingress              = "INGRESS_TRAFFIC_ALL"
  invoker_iam_disabled = true

  template {
    containers {
      image = "anthirion/netflix-apiserver:v1"
      ports {
        container_port = 8080
      }
    }
    vpc_access {
      egress = "ALL_TRAFFIC"
      network_interfaces {
        network = "private-network"
      }
    }
  }
}

############################# Règles FW #############################

resource "google_compute_firewall" "mongodb" {
  name    = "allow-mongodb-requests"
  network = google_compute_network.vpc_network.name

  allow {
    protocol = "tcp"
    ports    = ["80", "443", "27017"]
  }

  source_ranges      = ["0.0.0.0/0"]
  destination_ranges = ["0.0.0.0/0"]
}

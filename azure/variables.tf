locals {
  rg_name = "antoine-thirion40814"
  region  = "West Europe"
}

variable "mongo_user" {
  type = string
}

variable "mongo_password" {
  type      = string
  sensitive = true
}


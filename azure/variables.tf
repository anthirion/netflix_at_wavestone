locals {
  rg_name = "antoine-thirion26294"
  region  = "West Europe"
}

variable "mongo_user" {
  type = string
}

variable "mongo_password" {
  type      = string
  sensitive = true
}


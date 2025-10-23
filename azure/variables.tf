locals {
  rg_name = "antoine-thirion26294"
  region  = "West Europe"
}

variable "dockerhub_username" {
  type = string
}

variable "dockerhub_token" {
  type      = string
  sensitive = true
}

variable "mongo_user" {
  type = string
}

variable "mongo_password" {
  type      = string
  sensitive = true
}


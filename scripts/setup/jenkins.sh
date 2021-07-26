#!/usr/bin/env bash

# Install Git on Ubuntu
sudo apt-get update
sudo apt install -y git

# Install Java for Jenkins
sudo apt install -y openjdk-11-jdk

# Install Jenkins LTS on Ubuntu
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get update
sudo apt-get -y install jenkins

# Install Node JS v14.x and NPM
curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs npm

# Install Docker for building and pushing image to DockerHub
sudo apt-get install -y \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# Setup docker login for jenkins user (or just use docker pipeline plugin...)
sudo su
su - jenkins
sudo docker login

# Allow jenkins user to run docker command (NOT sure if docker pipeline plugin will automatically allow add the user to docker group)
sudo groupadd docker # Add docker group if it doesn't exist
sudo usermod -aG docker jenkins
sudo service docker restart # Might be optional...
# Need to logout jenkins user... (in my case, I just restart the VM, maybe can run 'sudo service jenkins restart')

# Install kubectl
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /usr/share/keyrings/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/usr/share/keyrings/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubectl

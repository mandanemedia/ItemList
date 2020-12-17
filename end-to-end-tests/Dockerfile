FROM centos:centos7

RUN yum install -y yum-utils &&  yum-config-manager \
                                   --add-repo \
                                    https://download.docker.com/linux/centos/docker-ce.repo

RUN yum install -y docker-ce docker-ce-cli containerd.io

RUN curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && chmod 755 /usr/local/bin/docker-compose

RUN yum -y install make wget

RUN wget https://nodejs.org/dist/v12.18.3/node-v12.18.3-linux-x64.tar.xz

RUN tar --strip-components 1 -xvf node-v* -C /usr/local
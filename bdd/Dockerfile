
FROM mariadb:10.9.3-jammy

# Install extra system packages
RUN curl -sL https://deb.nodesource.com/setup | bash - && \
    apt-get update && \
    apt-get install --no-install-recommends -y \
    unzip && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD bdd/sql-files/ /sql-files/
ADD bdd/config/my.cnf /etc/mysql/my.cnf
RUN chmod 0644 /etc/mysql/my.cnf

WORKDIR /sql-files


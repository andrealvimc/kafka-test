FROM nestjs-kafka-app:latest
COPY --from=jb-devcontainer-features-7f2b282d14de61fd8642fa4b10925ad4 /tmp/jb-devcontainer-features /tmp/jb-devcontainer-features/
ENV PATH="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
ENV NODE_VERSION="20.11.1"
ENV YARN_VERSION="1.22.19"

RUN chmod -R 0755 /tmp/jb-devcontainer-features/ghcr.io-devcontainers-features-common-utils-2 \
&& cd /tmp/jb-devcontainer-features/ghcr.io-devcontainers-features-common-utils-2 \
&& chmod +x ./devcontainer-feature-setup.sh \
&& ./devcontainer-feature-setup.sh
RUN chmod -R 0755 /tmp/jb-devcontainer-features/ghcr.io-devcontainers-contrib-features-zsh-plugins-0 \
&& cd /tmp/jb-devcontainer-features/ghcr.io-devcontainers-contrib-features-zsh-plugins-0 \
&& chmod +x ./devcontainer-feature-setup.sh \
&& ./devcontainer-feature-setup.sh
RUN chmod -R 0755 /tmp/jb-devcontainer-features/ghcr.io-stuartleeks-dev-container-features-shell-history-0 \
&& cd /tmp/jb-devcontainer-features/ghcr.io-stuartleeks-dev-container-features-shell-history-0 \
&& chmod +x ./devcontainer-feature-setup.sh \
&& ./devcontainer-feature-setup.sh
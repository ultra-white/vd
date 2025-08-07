.PHONY: build-dev
build-dev:
	docker compose -f compose.dev.yaml build

.PHONY: start-dev
start-dev:
	docker compose -f compose.dev.yaml up -d

.PHONY: stop-dev
stop-dev:
	docker compose -f compose.dev.yaml down


.PHONY: build-prod
build-prod:
	docker compose -f compose.prod.yaml build

.PHONY: start-prod
start-prod:
	docker compose -f compose.prod.yaml up -d

.PHONY: stop-prod
stop-prod:
	docker compose -f compose.prod.yaml down

.PHONY: repull
repull:
	git pull
	docker compose -f compose.prod.yaml build
	docker compose -f compose.prod.yaml down
	docker compose -f compose.prod.yaml up -d
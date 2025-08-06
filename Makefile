.PHONY: build
build-prod:
	docker compose -f compose.prod.yaml build

.PHONY: start
	docker compose -f compose.prod.yaml up -d

.PHONY: stop
stop-prod:
	docker compose -f compose.prod.yaml down

.PHONY: repull
repull:
	git pull
	docker compose -f compose.prod.yaml down
	docker compose -f compose.prod.yaml build
	docker compose -f compose.prod.yaml up -d
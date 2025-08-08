import type { StrapiApp } from "@strapi/strapi/admin";

export default {
	config: {
		locales: ["ru"],
		translations: {
			ru: {
				"global.home": "Главная",
				"HomePage.header.subtitle": "Добро пожаловать в административную панель",
				"HomePage.header.title": "Приветствую, {name}",
				"content-type-builder.plugin.name": "Конструктор типов контента",
				"upload.settings.form.sizeOptimization.description":
					"Включение этой опции уменьшит размер изображения и немного снизит его качество.",
				"review-workflows.plugin.name": "Review Workflows",
				"Settings.review-workflows.list.page.title": "Review Workflows",
				"Settings.review-workflows.list.page.subtitle": "Manage your content review process",
				"Settings.review-workflows.not-available":
					"Review Workflows is only available as part of a paid plan. Upgrade to create and manage workflows.",
				"email.Settings.email.plugin.subTitle": "Протестируйте настройки плагина электронной почты.",
				"email.Settings.email.plugin.text.configuration":
					"Плагин настроивается через файл: {file}, документацию можно найти по этой ссылке: {link}.",
				"email.Settings.email.plugin.title": "Конфигурация",
				"email.Settings.email.plugin.title.config": "Конфигурация",
				"email.SettingsNav.section-label": "Email плагин",
				"email.Settings.email.plugin.label.provider": "Email провайдер",
				"email.Settings.email.plugin.label.defaultFrom": "Email отправителя по-умолчанию",
				"email.Settings.email.plugin.label.defaultReplyTo": "Email получателя по-умолчанию",
				"email.Settings.email.plugin.title.test": "Протестируйте доставку Email",
				"email.Settings.email.plugin.label.testAddress": "Email получателя",
				"email.Settings.email.plugin.button.test-email": "Отправить тестовый Email",
				"content-manager.plugin.name": "Управление контентом",
				"content-manager.widget.last-edited.title": "Последние измененные записи",
				"content-manager.widget.last-published.title": "Последние опубликованные записи",
				"content-manager.widget.last-edited.no-data": "Нет отредактированных записей",
				"content-manager.widget.last-published.no-data": "Нет опубликованных записей",
				"cloud.plugin.name": "Деплой",
				"cloud.Homepage.title": "Полностью управляемый облачный хостинг для вашего проекта Strapi",
				"cloud.Homepage.subTitle":
					"Выполните этот двухэтапный процесс, чтобы получить все, что вам нужно для запуска Strapi в продакшен.",
				"cloud.Homepage.githubBox.title.not-versioned": "Разместите свой проект на GitHub",
				"cloud.Homepage.githubBox.subTitle.not-versioned":
					"Перед развертыванием в Strapi Cloud необходимо создать версию вашего проекта на GitHub.",
				"cloud.Homepage.cloudBox.title": "Деплой в Strapi Cloud",
				"cloud.Homepage.cloudBox.subTitle":
					"Наслаждайтесь оптимизированным для Strapi стеком, включающим базу данных, провайдер электронной почты и CDN.",
				"cloud.Homepage.githubBox.buttonText": "Загрузить на GitHub",
				"cloud.Homepage.cloudBox.buttonText": "Деплой в Strapi Cloud",
				"cloud.Homepage.textBox.label.versioned": "Попробуй Strapi Cloud бесплатно!",
				"cloud.Homepage.textBox.text.versioned":
					"Strapi Cloud предлагает 14-дневную бесплатную пробную версию, позволяющую вам поэкспериментировать с вашим проектом в облаке, включая все функции.",
			},
		},
	},
	bootstrap(app: StrapiApp) {
		console.log(app);
	},
};

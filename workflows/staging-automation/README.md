# Automation for the staging branch

This folder contains different workflows that listen for push and pull_requests events into the staging branch. The main jobs are:
- Generate the changelog and update it in the repository.
- Bump the app version.
- Build the application images and/or deploy it.
- Notify the new image or app deployed to Slack.
- Update the Notion page where deployed versions are tracked.


There are different workflows depending on the programing language of the project. This is mainly due to the differences in how the application is build and/or deployed.

## ⚙️ Config

The single config file `./config/changelog_config.json` should be copied into the `.github` folder an updated properly.

In the yml workflow file update any missing parameter that is marked with a ⚙️

## ⭐ Acknowledgement

This are the third-party actions used on the different workflows.

- mikepenz [release-changelog-builder-action](https://github.com/mikepenz/release-changelog-builder-action)
- stefanzweifel [git-auto-commit-action](https://github.com/stefanzweifel/git-auto-commit-action)
- riskledger [update-pr-description](https://github.com/riskledger/update-pr-description)
- BetaHuhn [deploy-to-vercel-action](https://github.com/BetaHuhn/deploy-to-vercel-action)
- slackapi [slack-github-action](https://github.com/slackapi/slack-github-action)
- docker [login-action](https://github.com/docker/login-action)
- google-github-actions [setup-gcloud](https://github.com/google-github-actions/setup-gcloud)
- aws-actions [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) and [amazon-ecr-login](https://github.com/aws-actions/amazon-ecr-login)

Also, the GitHub's action team [checkout](https://github.com/actions/checkout) and [github-script](https://github.com/actions/github-script) actions. 
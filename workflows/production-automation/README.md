# Automation for the production branche

This folder contains different workflows that listen for push events into the production branche (at the moment main or master). The main jobs are:
- Create the GitHub release and git tag.
- Build and/or deploy the application.
- Notify the new image or app deployed to Slack.
- Update the Notion page where deployed versions are tracked.

There are different workflows depending on the programing language of the project. This is mainly due to the differences in how the application is build and/or deployed.

## ⚙️ Config

In the yml workflow file update any missing parameter that is marked with a ⚙️

## ⭐ Acknowledgement

This are the third-party actions used on the different workflows.

- BetaHuhn [deploy-to-vercel-action](https://github.com/BetaHuhn/deploy-to-vercel-action)
- softprops [action-gh-release](https://github.com/softprops/action-gh-release)
- slackapi [slack-github-action](https://github.com/slackapi/slack-github-action)

Also, the GitHub's action team [checkout](https://github.com/actions/checkout) and [github-script](https://github.com/actions/github-script) actions. 
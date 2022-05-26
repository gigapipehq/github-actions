# Automation for the development branches

This folder contains different workflows that listen for push and/or pull_requests events (depending on the project) into the working branches (at the moment rc-vX.Y.Z and hotfix-vX.Y.Z). The main jobs are:
- Build and/or deploy the application.
- Update the Notion page where deployed versions are tracked.

There are different workflows depending on the programing language of the project. This is mainly due to the differences in how the application is build and/or deployed.

## ⚙️ Config

In the yml workflow file update any missing parameter that is marked with a ⚙️

## ⭐ Acknowledgement

This are the third-party actions used on the different workflows.

- BetaHuhn [deploy-to-vercel-action](https://github.com/BetaHuhn/deploy-to-vercel-action)
- RafikFarhad [push-to-gcr-github-action](https://github.com/RafikFarhad/push-to-gcr-github-action)
- benc-uk [workflow-dispatch](https://github.com/benc-uk/workflow-dispatch)
- docker [login-action](https://github.com/docker/login-action)
- google-github-actions [setup-gcloud](https://github.com/google-github-actions/setup-gcloud)
- aws-actions [configure-aws-credentials](https://github.com/aws-actions/configure-aws-credentials) and [amazon-ecr-login](https://github.com/aws-actions/amazon-ecr-login)

Also, the GitHub's action team [checkout](https://github.com/actions/checkout) and [github-script](https://github.com/actions/github-script) actions. 
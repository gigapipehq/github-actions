# Automation for all pull requests

This folder contains different workflows that listen for pull_requests events. The main jobs are:
- Add assignee and reviewers to the PR.
- Add labels mapping the name of the branches (used for changelog generation)
- Run project test and report on coverage changes.


There are different workflows depending on the programing language of the project. This is mainly due to the differences in how the tests are executed.

## ⚙️ Config

The two config files `./config/pr-assigner.yml` and `./config/pr-labeler.yml` should be copied into the `.github` folder an updated properly.

## ⭐ Acknowledgement

This are the third-party actions used on the different workflows.

- kentaro-m [auto-assign-action](https://github.com/kentaro-m/auto-assign-action)
- TimonVS [pr-labeler-action](https://github.com/TimonVS/pr-labeler-action)
- romeovs [lcov-reporter-action](https://github.com/romeovs/lcov-reporter-action)
- jandelgado [gcov2lcov-action](https://github.com/jandelgado/gcov2lcov-action)

Also, the GitHub's action team [checkout](https://github.com/actions/checkout), [setup-node](https://github.com/actions/setup-node), [cache](https://github.com/actions/cache), [setup-python](https://github.com/actions/setup-python) and [setup-go](https://github.com/actions/setup-go) actions. 
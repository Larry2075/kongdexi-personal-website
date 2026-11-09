# GitHub backup

- This repository backs up 孔德曦's personal website, including `dist/` and `local-archive/`.
- GitHub remote: `git@github.com:Larry2075/kongdexi-personal-website.git`.
- Use the existing SSH configuration for `github.com`; do not print, copy, commit, or upload private keys.
- This macOS user's SSH identity is configured in `~/.ssh/config`. No agent-specific token is needed.
- Check `git status` and the remote branch before pushing. Preserve remote changes; never force-push unless explicitly authorized.
- Pushing changes to `dist/` on `main` automatically deploys GitHub Pages through `.github/workflows/pages.yml`.
- Public URL: `https://larry2075.github.io/kongdexi-personal-website/`.
- The separate Sites website still requires its existing deployment workflow when requested.

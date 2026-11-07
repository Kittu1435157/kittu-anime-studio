# Push this starter to GitHub

The connected GitHub integration in the authoring session could read repository metadata but rejected content writes (403). This archive therefore contains the starter files locally and has not changed the remote branch.

After extracting this folder, from PowerShell run:

```powershell
git init
git add .
git commit -m "chore: establish Kittu Anime Studio Stage 1 foundation"
git branch -M main
git remote add origin https://github.com/Kittu1435157/kittu-anime-studio.git
git push -u origin main
```

If Git asks you to pull first, stop and inspect the remote history; do not force-push. The existing remote has an initial README commit. In that case, use `git clone https://github.com/Kittu1435157/kittu-anime-studio.git`, copy these files into the cloned folder (replace README.md), then `git add .`, `git commit`, and `git push`.

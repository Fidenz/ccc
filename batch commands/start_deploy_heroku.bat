cmd /c  cd ..
cmd /c  git commit --allow-empty -m "Build commit"
cmd /c  git push heroku master
@echo off
echo Press enter to exit
set /p input=



새로운 프로젝트를 세팅하면서 배포 관련 설정을 진행하고 있는데, Github에 올려진 쉘스크립트 파일을 서버에서 실행하지 못하는 이슈가 발생했다. 

배포잡은 Github에 올려진 소스코드를 읽어와서 서버에서 네이버에서 사용하는 사내 배포툴을 통해 해당 스크립트를 실행하는 것이었는데, 'Permission denied'가 발생했다.

서버에 직접 접근하여 파일 권한을 확인한 결과 다음과 같이 나오게 되었다.
```terminanl
$ ls -all
total 4
drwxrwxr-x 2 irteam irteam  21 Jul 15 16:08 .
drwxr-x--- 8 irteam irteam 228 Jul 15 16:08 ..
-rw-rw-r-- 1 irteam irteam 305 Jul 15 15:24 test.sh
```

파일 권한을 수정한 후 실행했을 때, 제대로 동작을 했기 때문에 다시 배포 잡을 실행했지만 동일하게 'Permission denied'가 발생했다.

```terminal
$ chmod +x test.sh
$ ls -all
total 4
drwxrwxr-x 2 irteam irteam  21 Jul 15 16:08 .
drwxr-x--- 8 irteam irteam 228 Jul 15 16:08 ..
-rwxrwxr-x 1 irteam irteam 305 Jul 15 15:24 test.sh
```

확인해보니 Github에 올려진 파일들은 파일 권한 설정도 동일하게 관리하기 때문에 로컬에서 해당 파일에 대한 권한을 수정한 후 push 한 후에는 정상적으로 동작했다.

실제로 Git에서는 파일 권한만 변경을 하더라도 해당 파일을 추적하는 걸 알 수 있다.

```terminal
$ git st
On branch develop
Your branch is up to date with 'origin/develop'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   src/deploy/beta/test.sh
$ git diff
diff --git a/src/deploy/beta/test.sh b/src/deploy/beta/test.sh
old mode 100644
new mode 100755
```
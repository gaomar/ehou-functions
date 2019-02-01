# NetlifyでClovaを動かそう
[Netlify](https://www.netlify.com/)はFunctionsを動かすことができます。
このFunctions機能を使って、Clovaを動かしてみましょう。

AWS LambdaやAzure Functionsなどありますが、クレジットカードの登録が必須なので、学生の方は少し敷居が高いです。

netlifyはgithubアカウントがあれば誰でも無料でFunctions機能を利用することができます。

# 料金
基本無料で利用することができます。  
無料枠は月の利用時間は100時間で、呼び出し回数が12万5千回です。

ちょっとお試しで試す分には十分利用できます。  
https://www.netlify.com/pricing/#addons

![s100](images/s100.png)

# git環境を用意する
githubに環境を用意しましょう

```
$ mkdir ehou-functions
$ cd ehou-functions
$ git init
$ git commit -m '初回コミット' --allow-empty
$ git remote add origin {githubのURL}
$ git push -u origin master
```

# Clova関数を作成しよう

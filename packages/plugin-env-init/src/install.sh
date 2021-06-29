#! /bin/bash

# prepare folders
mkdir -p ~/workspace/zoom
mkdir -p ~/workspace/github

# iterm2
curl -O https://iterm2.com/downloads/stable/iTerm2-3_4_8.zip ~/Downloads/
unzip ~/Downloads/iTerm2-3_4_8.zip -d ~/Applications

# oh my zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s /bin/zsh

echo 'export ZSH="/Users/liuziyang/.oh-my-zsh"' >> ~/.zshrc
echo 'ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE="1"' >> ~/.zshrc
# defaulr user
echo 'DEFAULT_USER="liuziyang"'  >> ~/.zshrc
source ~/.zshrc


# node version manager
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.38.0/install.sh | bash
echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
echo '[ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh" # This loads nvm' >> ~/.zshrc

# Created by mirror-config-china
echo 'export NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node' >> ~/.zshrc
echo 'export NODIST_NODE_MIRROR=https://npm.taobao.org/mirrors/node' >> ~/.zshrc
echo 'export NVM_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node' >> ~/.zshrc
echo 'export NVMW_NODEJS_ORG_MIRROR=https://npm.taobao.org/mirrors/node' >> ~/.zshrc
echo 'export NVMW_NPM_MIRROR=https://npm.taobao.org/mirrors/npm' >> ~/.zshrc

source ~/.zshrc

echo 'source ~/.bash_profile' >> ~/.zshrc

# 设置命令别名
echo 'alias python="/usr/local/bin/python3"' >> ~/.zshrc
echo 'alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
' >> ~/.zshrc
source ~/.zshrc

nvm install stable
nvm alias default node 
npm install --global nrm --registry=https://registry.npm.taobao.org
nrm use taobao
npm i -g yarn
npm i -g lazycommit
npm i -g lazyclone

# ssh-keygen 
ssh-keygen 
cat ~/.ssh/id_rsa.pub

## git alias
if [ -e ~/.gitconfig ]; then
echo '存在'
  git config --global alias.co checkout
  git config --global alias.br branch
  git config --global alias.st status
  git config --global alias.ss stash
  git config --global alias.pl pull
  git config --global alias.ps push
  git config --global alias.ci commit
fi

# vs code
curl -O https://az764295.vo.msecnd.net/stable/507ce72a4466fbb27b715c3722558bb15afa9f48/VSCode-darwin-universal.zip ~/Downloads/

unzip ~/Downloads/VSCode-darwin-universal.zip -d ~/Applications


# 终端美化
pip install powerline-status --user

# 安装主题
curl -o- https://raw.githubusercontent.com/fcamblor/oh-my-zsh-agnoster-fcamblor/master/install.sh | bash 

echo 'ZSH_THEME="agnoster"' >> ~/.zshrc

source ~/.zshrc

# 安装高亮插件
cd ~/.oh-my-zsh/custom/plugins/
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git

echo 'source /usr/local/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh' >> ~/.zshrc

source ~/.zshrc

# 安装字体
curl -o- https://raw.githubusercontent.com/powerline/fonts/master/install.sh | bash

mkdir -p ~/fe-toolkis/tmp
cd ~/fe-toolkis/tmp

git clone https://github.com/altercation/solarized

cd solarized/iterm2-colors-solarized/
open .

echo '点击安装配色方案，安装完成后参考 https://zhuanlan.zhihu.com/p/37195261 修该配色方案'

echo '参考 https://zhuanlan.zhihu.com/p/37195261 修改字体'

## Project deployment

### Step №1

```
git clone https://github.com/quadro-network/Explorer_Cosmos.git
```
### Step №2 Development

```
cd Explorer_Cosmos
yarn install 
yarn && yarn dev
```
### Step №3 Build explorer

```
yarn && yarn build

cp -r $HOME/Explorer_Cosmos/dist/* /var/www/explorer.quadro.network/html/
```

function getRndValue(min, max){
    return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound : 0,
            winner : null
        };
    },
    computed : {
        monsterBarStyles(){
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles(){
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
        specialAttackAvailable(){
            return this.currentRound % 3 !== 0;
        }
    },
    methods : {
        attackMonster(){
            this.currentRound++;
            const attackValue = getRndValue(5, 12);// Math.floor(Math.random() * (12 - 5) + 5);
            this.monsterHealth -= attackValue;

            this.attackPlayer();

            if (this.playerHealth < 0) {
                // Player lost

            }
        },
        attackPlayer(){
            const attackValue = getRndValue(8, 15);//Math.floor(Math.random() * (15 - 8) + 8);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRndValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRndValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }

            this.attackPlayer();
        },
        startGame(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
        },
        surrender(){
            this.winner = 'monster';
        }
    },
    watch : {
        playerHealth(value){
            if (value <= 0 && this.monsterHealth <= 0) {
                // Empate
                this.winner = 'draw'
            }else if(value <= 0){
                // Jugador gana
                this.winner = 'monster'
            }

        },
        monsterHealth(value){
            if (value <= 0 && this.playerHealth <= 0) {
                // Empate
                this.winner = 'draw'
            }else if(value <= 0){
                // Monstruo pierde
                this.winner = 'player'
            }
        }
    },
});

app.mount('#game');
let move_speed = 3, gravity = 0.5; //schwerkraft -> fall von vogell
let bird = document.querySelector('.bird');
let img = document.getElementById('bird-1');
let sound_point = new Audio('sounds effect/point.mp3');
let sound_die = new Audio('sounds effect/die.mp3');

let bird_props = bird.getBoundingClientRect(); //macht grösse und positiontin von vogell 

let background = document.querySelector('.background').getBoundingClientRect();

let score_val = document.querySelector('.score_val');
let message = document.querySelector('.message');
let score_title = document.querySelector('.score_title');

let game_state = 'Start';
img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
    if (e.key == 'Enter' && game_state != 'Play') {
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
            e.remove();
        });
        img.style.display = 'block';
        bird.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = ' ';
        score_title.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});


function play() {
    function move() {
        if (game_state != 'Play')
            return;
    
        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        pipe_sprite.forEach((element) => {
            let pipe_sprite_props = element.getBoundingClientRect();
            bird_props = bird.getBoundingClientRect();
    
            if (pipe_sprite_props.right <= 0) {
                element.remove();
            } else {
                if (bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width &&
                    bird_props.left + bird_props.width > pipe_sprite_props.left &&
                    bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height &&
                    bird_props.top + bird_props.height > pipe_sprite_props.top) {
                   

                    game_state = 'End';
                    message.innerHTML = 'Game Over'+ '<br>Press Enter to Restart';
                    message.classList.add('messageStyle');
                    img.style.display = 'none';
                    sound_die.play();
                    return;
                } else {
                 
                    if (pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && element.increase_score == '1') {
                        score_val.innerHTML = +score_val.innerHTML + 1; // Punkte erhöhen
                        sound_point.play();
                        element.increase_score = '0'; 
                    }
                    element.style.left = pipe_sprite_props.left - move_speed + 'px';
                }
            }
        });
        requestAnimationFrame(move); // Wiederhole die Funktion, um die Bewegung fortzusetzen
    }
    
    requestAnimationFrame(move);

    let bird_dy = 0;

    function apply_gravity() {
        if (game_state != 'Play') return;
    
        bird_dy += gravity; // Schwerkraft anwenden
    
        //steuerig vom vogell
        document.addEventListener('keydown', (e) => {
            if ((e.key == ' ' || e.key == 'ArrowUp') && game_state == 'Play') {
                img.src = 'images/unicorn-2.png'; 
                bird_dy = -7.6; 

            }
        });
            
        document.addEventListener('keyup', (e) => {
            if (e.key == ' ' || e.key == 'ArrowUp') {
                img.src = 'images/unicorn.png'; // 
            }
        });
        
    
        if (bird_props.top <= 0 || bird_props.bottom >= background.bottom) {
            game_state = 'End';
            message
            
             .style.left = '28vw';
            window.location.reload();
            message.classList.remove('messageStyle');
            return;
        }
    
        // shwerkraft und vogel verknüpfe
        bird.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird.getBoundingClientRect();
    
        // Wiederhole
        requestAnimationFrame(apply_gravity);

        let pipe_seperation = 0;
        let pipe_gap = 35;

    }

    requestAnimationFrame(apply_gravity);
    let pipe_seperation = 0;
    let pipe_gap = 35;

    function create_pipe() {
        if (game_state != 'Play') return;

        if (pipe_seperation > 115) {
            pipe_seperation = 0;

            //ergendwelli posi för oberi röhre
            let pipe_posi = Math.floor(Math.random() * 43) + 8;

            //erstelle vo öberri rörhre
            let pipe_sprite_inv = document.createElement('div');
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw'; //start am rechte rand

    document.body.appendChild(pipe_sprite_inv);
            
    
    let pipe_sprite = document.createElement('div');
    pipe_sprite.className = 'pipe_sprite';
    pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';  // Position für untere Röhre
    pipe_sprite.style.left = '100vw';  
    pipe_sprite.increase_score = '1';  // För pünkt

            document.body.appendChild(pipe_sprite);

        }

        pipe_seperation++; //inkrement förs intervall zwösche de röhre
        requestAnimationFrame(create_pipe); //funktion werd emmer weder ufgrüee
    }
    requestAnimationFrame(create_pipe);
}

function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
       try { score = parseFloat(score); } catch (e) { score = 0; }
       if (score>saved) {
         saved = score;
         localStorage.highScore = '' + score;
       }
    }
    if (isNaN(saved)) {
       saved = 0;
       localStorage.highScore = '0';
    }
    return saved;
 }
import { Scene } from 'phaser';
import { EventBus } from '../EventBus';
import { platform } from 'os';

export class Game2 extends Scene {
    private platforms!: Phaser.Physics.Arcade.StaticGroup;
    private player!: Phaser.Physics.Arcade.Sprite;
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    private stars!: Phaser.Physics.Arcade.Group;
    private modal!: Phaser.GameObjects.Container;
    private score: number = 0;
    private groundTop!: Phaser.Physics.Arcade.StaticGroup;
    // private groundBottom!: Phaser.Physics.Arcade.StaticGroup;
    private modalElements!: any;

    constructor() {
        super('Game2');
    }

    preload() {
        this.load.setPath('assets');
        
        // Load game assets
        this.load.image('sky', 'level3.png');
        this.load.image('ground-top', 'top.svg');
        // this.load.image('ground-bottom', 'botoom.svg');
        this.load.image('T','T.svg')
        this.load.image('V','V.svg')
        this.load.image('U','U.svg')
        this.load.image('S','S.svg')
        this.load.image('W','W.svg')
        this.load.image('X1','X1.svg')
        this.load.image('X2','X2.svg')
        this.load.image('Z1','Z1.svg')
        this.load.image('Z2','Z2.svg')
        this.load.image('Z3','Z3.svg')


        
        // Load player sprites
        this.load.image('still1', 'still position 1.png');
        this.load.image('still2', 'still position 2.png');
        this.load.image('walk1', 'walking positon 1.png');
        this.load.image('walk2', 'walking position 2.png');
        this.load.image('jump1', 'jumping pposition 1.png');
        this.load.image('jump2', 'jumping position 2.png');
        this.load.image('jump3', 'jumping position 3.png');
        
        
        this.load.image('collectible', 'star.png');
    }

    create() {
        // Get window dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;
        console.log(width,height)
        // Add background
        const bg = this.add.image(width/2, height/2, 'sky');
        bg.setDisplaySize(width, height );
        this.groundTop = this.physics.add.staticGroup();

        this.platforms = this.physics.add.staticGroup();

        // Create a single tile platform
        const platform1 = this.platforms.create(332,  836, 'T');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform2 = this.platforms.create(625,  627, 'U');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        platform2.setFlipX(true); // Slightly transparent
        const platform3 = this.platforms.create(248,  263, 'V');
        // platform1.setScale(1.6).refreshBody(); // Reduced scale
        // platform3.setAlpha(1); // Slightly 
        const platform4= this.platforms.create(407,  966, 'W');
        // platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        // platform4.setFlipX(true); // Slightly transparent
        const platform5 = this.platforms.create(620,  299, 'X2');
        // platform1.setScale(1.6).refreshBody(); // Reduced scale
        // platform1.setAlpha(1); // Slightly 
        const platform6= this.platforms.create(678,  184, 'X1');
        // platform2.setScale(1.6).refreshBody(); // Reduced scale
        // platform2.setAlpha(1)
        // platform6.setFlipX(true); // Slightly transparent
        const platform7 = this.platforms.create(567,  952, 'S');
        platform1.setScale(1.6).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        const platform8= this.platforms.create(960,  787, 'Z2');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        // platform8.setFlipX(true); // Slightly transparent
        const platform9= this.platforms.create(809,  840, 'Z1');
        platform2.setScale(1.6).refreshBody(); // Reduced scale
        platform2.setAlpha(1)
        const platform10 = this.platforms.create(1114,  840, 'Z3');
        platform10.setScale(1).refreshBody(); // Reduced scale
        platform1.setAlpha(1); // Slightly 
        // platform10.setFlipX(true); // Slightly transparent
        

        



        // Create animations
        this.anims.create({
            key: 'idle',
            frames: [
                { key: 'still1' },
                { key: 'still2' }
            ],
            frameRate: 4,
            repeat: -1
        });

        this.anims.create({
            key: 'walk',
            frames: [
                { key: 'walk1' },
                { key: 'walk2' }
            ],
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [
                { key: 'jump1' },
                { key: 'jump2' },
                { key: 'jump3' }
            ],
            frameRate: 8,
            repeat: 0
        });

        // Add player with improved spawn position
        this.player = this.physics.add.sprite(width * 0.1, height * 0.4, 'still1');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.06);
        
        // Start with idle animation
        this.player.play('idle');

        // Add collisions
        // this.physics.add.collider(this.player, this.groundBottom);
        this.physics.add.collider(this.player, this.platforms);

        // Add stars with better distribution
        // this.stars = this.physics.add.group({
        //     key: 'collectible',
        //     repeat: 8,
        //     setXY: { 
        //         x: width * 0.1, 
        //         y: 0, 
        //         stepX: width * 0.12 
        //     }
        // });

        // // Customize each star
        // this.stars.children.iterate((child: any) => {
        //     child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        //     child.setScale(0.8);
        //     // Add glow effect
        //     const glow = this.add.circle(child.x, child.y, 20, 0xffff00, 0.2);
        //     this.tweens.add({
        //         targets: glow,
        //         alpha: 0,
        //         duration: 1000,
        //         yoyo: true,
        //         repeat: -1
        //     });
        // });

        // Set up collisions
        // this.physics.add.collider(this.stars, this.groundTop);
        // this.physics.add.collider(this.stars, this.groundBottom);
        // this.physics.add.collider(this.stars, this.platforms);
        // this.physics.add.overlap(this.player, this.stars, this.collectStar, undefined, this);

        // Input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Create modal
        this.createModal();

        EventBus.emit('current-scene-ready', this);
    }

    private createModal() {
        // Get window dimensions
        const width = window.innerWidth;
        const height = window.innerHeight;
        const centerX = width / 2;
        const centerY = height / 2;

        // Create modal background
        this.modal = this.add.rectangle(centerX, centerY, 400, 300, 0x000000);
        this.modal.setStrokeStyle(2, 0x4a90e2);
        this.modal.setAlpha(0.8);
        this.modal.setVisible(false);

        // Create modal text with improved styling
        const modalText = this.add.text(centerX, centerY - 80, 'You collected a star!', {
            fontSize: '32px',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            align: 'center'
        });
        modalText.setOrigin(0.5);
        modalText.setVisible(false);

        // Create score text with improved styling
        const scoreText = this.add.text(centerX, centerY - 30, 'Enter your name:', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif',
            align: 'center'
        });
        scoreText.setOrigin(0.5);
        scoreText.setVisible(false);

        // Create HTML input element with improved styling
        const input = document.createElement('input');
        input.type = 'text';
        input.id = 'nameInput';
        input.style.position = 'fixed';
        input.style.left = `${centerX - 100}px`;
        input.style.top = `${centerY + 10}px`;
        input.style.width = '200px';
        input.style.padding = '12px';
        input.style.fontSize = '16px';
        input.style.borderRadius = '8px';
        input.style.border = '2px solid #4a90e2';
        input.style.outline = 'none';
        input.style.textAlign = 'center';
        input.style.display = 'none';
        input.style.zIndex = '1000';
        input.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        input.style.color = '#2c3e50';
        input.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        input.style.transition = 'all 0.3s ease';

        // Add hover effect
        input.style.transition = 'all 0.3s ease';
        input.addEventListener('mouseover', () => {
            input.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
        });
        input.addEventListener('mouseout', () => {
            input.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
        });

        // Prevent Phaser from capturing keyboard events when input is focused
        input.addEventListener('keydown', (e) => {
            e.stopPropagation();
            if (e.key === 'Enter') {
                this.closeModal();
            }
        });

        document.body.appendChild(input);

        // Create continue button with improved styling
        const continueButton = this.add.rectangle(centerX, centerY + 80, 200, 50, 0x4a90e2);
        continueButton.setInteractive();
        continueButton.setVisible(false);

        // Add hover effect to continue button
        continueButton.on('pointerover', () => {
            continueButton.setFillStyle(0x357abd);
            document.body.style.cursor = 'pointer';
        });
        continueButton.on('pointerout', () => {
            continueButton.setFillStyle(0x4a90e2);
            document.body.style.cursor = 'default';
        });

        const continueText = this.add.text(centerX, centerY + 80, 'Continue', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Arial, sans-serif'
        });
        continueText.setOrigin(0.5);
        continueText.setVisible(false);

        // Add click handler to continue button
        continueButton.on('pointerdown', () => this.closeModal());

        // Store modal elements for later use
        this.modalElements = {
            background: this.modal,
            text: modalText,
            scoreText: scoreText,
            input: input,
            continueButton: continueButton,
            continueText: continueText
        };
    }

    private collectStar(player: Phaser.Physics.Arcade.Sprite, star: Phaser.Physics.Arcade.Sprite) {
        star.destroy();
        this.score += 10;

        // Show modal and input
        const scoreText = this.modalElements.scoreText;
        scoreText.setText('Score: ' + this.score);
        this.modalElements.background.setVisible(true);
        this.modalElements.text.setVisible(true);
        this.modalElements.scoreText.setVisible(true);
        this.modalElements.input.style.display = 'block';
        this.modalElements.input.focus();
        this.modalElements.continueButton.setVisible(true);
        this.modalElements.continueText.setVisible(true);

        // Pause game physics while modal is shown
        this.physics.pause();
    }

    private closeModal() {
        if (this.modalElements.background.visible) {
            const inputElement = document.getElementById('nameInput') as HTMLInputElement;
            const enteredText = inputElement.value;
            console.log('Text entered:', enteredText);
            
            // Clear the input
            inputElement.value = '';
            inputElement.style.display = 'none';
            this.modalElements.background.setVisible(false);
            this.modalElements.text.setVisible(false);
            this.modalElements.scoreText.setVisible(false);
            this.modalElements.continueButton.setVisible(false);
            this.modalElements.continueText.setVisible(false);
            this.physics.resume();
        }
    }

    update() {
        // Only process movement if modal is not visible and input is not focused
        if (this.modalElements.background.visible || document.activeElement?.id === 'nameInput') return;

        const onGround = this.player.body.touching.down;

        // Horizontal movement
        if (this.cursors.right.isDown) {
            this.player.setVelocityX(500);
            this.player.setFlipX(true);
            if (onGround) {
                this.player.play('walk', true);
            }
        }
        else if (this.cursors.left.isDown) {
            this.player.setVelocityX(-500); 
            this.player.setFlipX(false);
            if (onGround) {
                this.player.play('walk', true);
            }
        }
        else {
            this.player.setVelocityX(0);
            if (onGround) {
                this.player.play('idle', true);
            }
        }

        // Jumping - only allow when on ground
        if (this.cursors.up.isDown && onGround) {
            this.player.setVelocityY(-700);
            this.player.play('jump', true);
        }
        
        // If in air and not playing jump animation, play jump frame 2
        if (!onGround && !this.player.anims.isPlaying) {
            this.player.setTexture('jump2');
        }
    }
}

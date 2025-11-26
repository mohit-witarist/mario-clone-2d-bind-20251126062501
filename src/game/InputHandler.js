class InputHandler {
  constructor() {
    this.keys = {
      left: false,
      right: false,
      jump: false,
      fire: false,
      down: false
    };
    
    this.jumpPressed = false;
    this.firePressed = false;
    
    this.init();
  }
  
  init() {
    window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    window.addEventListener('keyup', (e) => this.handleKeyUp(e));
  }
  
  handleKeyDown(e) {
    switch(e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = true;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = true;
        break;
      case 'ArrowUp':
      case 'KeyW':
      case 'Space':
        if (!this.jumpPressed) {
          this.keys.jump = true;
          this.jumpPressed = true;
        }
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.down = true;
        break;
      case 'KeyX':
      case 'ShiftLeft':
        if (!this.firePressed) {
          this.keys.fire = true;
          this.firePressed = true;
        }
        break;
    }
  }
  
  handleKeyUp(e) {
    switch(e.code) {
      case 'ArrowLeft':
      case 'KeyA':
        this.keys.left = false;
        break;
      case 'ArrowRight':
      case 'KeyD':
        this.keys.right = false;
        break;
      case 'ArrowUp':
      case 'KeyW':
      case 'Space':
        this.keys.jump = false;
        this.jumpPressed = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.down = false;
        break;
      case 'KeyX':
      case 'ShiftLeft':
        this.keys.fire = false;
        this.firePressed = false;
        break;
    }
  }
  
  consumeJump() {
    const jumped = this.keys.jump;
    this.keys.jump = false;
    return jumped;
  }
  
  consumeFire() {
    const fired = this.keys.fire;
    this.keys.fire = false;
    return fired;
  }
  
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}

export default InputHandler;

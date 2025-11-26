class InputHandler {
  constructor() {
    this.keys = {
      left: false,
      right: false,
      jump: false,
      fire: false,
      run: false,
      down: false
    };
    
    this.jumpJustPressed = false;
    this.fireJustPressed = false;
    this.jumpHeldState = false;
    
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    
    this.init();
  }
  
  init() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }
  
  handleKeyDown(e) {
    if (e.repeat) return;
    
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
        this.jumpJustPressed = true;
        this.keys.jump = true;
        this.jumpHeldState = true;
        e.preventDefault();
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.down = true;
        break;
      case 'KeyX':
      case 'ShiftRight':
        this.fireJustPressed = true;
        this.keys.fire = true;
        break;
      case 'ShiftLeft':
      case 'KeyZ':
        this.keys.run = true;
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
        this.jumpHeldState = false;
        break;
      case 'ArrowDown':
      case 'KeyS':
        this.keys.down = false;
        break;
      case 'KeyX':
      case 'ShiftRight':
        this.keys.fire = false;
        break;
      case 'ShiftLeft':
      case 'KeyZ':
        this.keys.run = false;
        break;
    }
  }
  
  consumeJump() {
    const jumped = this.jumpJustPressed;
    this.jumpJustPressed = false;
    return jumped;
  }
  
  consumeFire() {
    const fired = this.fireJustPressed;
    this.fireJustPressed = false;
    return fired;
  }
  
  isJumpHeld() {
    return this.jumpHeldState;
  }
  
  isRunning() {
    return this.keys.run;
  }
  
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}

export default InputHandler;

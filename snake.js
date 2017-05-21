function Snake() {
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];
    
    this.flag = false;
    this.lvl;
    this.lvl_limit = 10 ;
    
    
    this.init = function() {
        //console.log('Starting Over!')
        alert("Game over");
        this.x = 0;
        this.y = 0;
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
        this.flag = false;
        this.lvl = num_lvl;
    }

    this.eat = function(pos) {
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            this.flag = true;
            return true;
        } else {
            return false;
        }
    }
    
    
    this.HitWalls = function(walls){
        for (var i = 0; i < walls.length; i++) {
            var d = dist(this.x, this.y, walls[i].x, walls[i].y);
            if (d < 1) {
                this.ResetSnake();
                return true;
            } 
        }
        return false ;
    }
    
    this.death = function(walls) {
        var dead1 = false;
        var dead2 = false;
 	
        dead1 = this.EatTail();
        dead2 = this.HitWalls(walls);
        return (dead2 | dead1) ;
    }

    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    this.EatTail = function() {
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            if (d < 1) {
                //console.log('starting over');
                this.init();
            }
        }
    }

    this.update = function() {
        if (this.total === this.tail.length) {
            for (var i = 0; i < this.tail.length - 1; i++) {
                this.tail[i] = this.tail[i + 1];
            }
        }
        this.tail[this.total - 1] = createVector(this.x, this.y);
    
    
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        //this.x = constrain(this.x, 0, width - scl);
        //this.y = constrain(this.y, 0, height - scl);
        
        //Going across through walls xD
        if ( this.x > width- scl) {
		    this.x = 0;
        }
        else if ( this.x < 0) {
            this.x =  width- scl;	
        }
        if ( this.y > height- scl) {
            this.y = 0;	
        }
        else if ( this.y < 0) {
            this.y =  height- scl;	
        }
        
    }

    this.show = function() {
        fill(255);
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);

    }
}
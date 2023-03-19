
  AFRAME.registerComponent("boxes", {
    schema: {
      height: { type: "number", default: 2 },
      width: { type: "number", default: 2 },
      depth: { type: "number", default: 2 },
    },
    init: function () {
      var els = document.querySelectorAll(".boxes")
      //x position array
      px = [22.86, -17.35, -12.81, 0.44];
  
      //z position array
      pz = [70.56, -4.71, 14.91, 56.74 ];
  
      
      for (var i = 0; i < 20; i++) {
        var box = document.createElement("a-entity");
  
        //Update the position variables values from the array values.
        posX = px[i];
        posY = 1;
        posZ = pz[i];
  
        position = { x: posX, y: posY, z: posZ };
        
        box.setAttribute("id", "box" + i);
        
        box.setAttribute("position", position);
  
        box.setAttribute("gltf-model", "./soldier_crouched_alert_anim/scene.gltf")
  
        box.setAttribute("static-body", {});

        box.setAttribute("scale", {x: 0.3, y: 0.3, z: 0.3})
  
        
       
       
       
       var enemy = document.querySelector("#box"+ i);
        
        
        var position1 = new THREE.Vector3()
        var position2 = new THREE.Vector3()

        var player = document.querySelector("#weapon")
        
       var pos1 = player.getWorldPosition(position1)
        var pos2 = enemy.getWorldPosition(position2)

        var direction = pos1 - pos2
       
        var sceneEl = document.querySelector("#scene");

        
        box.addEventListener("collide",this.removeBox)


        sceneEl.appendChild(box);

      }
    },

    removeBox: function(e){
      // original entity(bullet) 

      console.log(e.detail.target.el)

      //original entity which bullet touch
      console.log(e.detail.body.el)
      
      var element = e.detail.target.el
      var elementHit = e.detail.body.el

      if(elementHit.id.includes("bullet")){
       elementHit.setAttribute("material",{
        opacity: 0.6,
        transparent: true
       })

     //impulsive and point vector
     var impulse = new CANNON.Vec3(-2,2,1) 
     var worldPoint = new CANNON.Vec3().copy(
       elementHit.getAttribute("position")
     
     )
     elementHit.body.applyImpulse(impulse,worldPoint)

       element.removeEventListener("collide",this.removeBox)
       var scene = document.querySelector("#scene")
       scene.removeChild(element)
      }
    },

   
  });
  
  
  
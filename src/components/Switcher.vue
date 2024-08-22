<template>
  <div class="container">
    <div class="arrow left" @click="previousObject">&lt;</div>
    <div class="arrow right" @click="nextObject">&gt;</div>
    <div
        v-for="(box, index) in boxes"
        :key="index"
        :class="['box', { current: index === currentIndex, selected: index === selectedIndex }]"
    >
      <!-- Content of the box -->
      <h3>Object {{ index + 1 }}</h3>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  name:"AdvancedSwitcher",
  data() {
    return {
      selectedIndex: 0,
      currentIndex: 0,
      boxes: [
        { x: 0, y: 0 }, // Object 1
        { x: 200, y: -200 }, // Object 2
        { x: -200, y: -200 }, // Object 3
      ],
    };
  },
  methods: {
    nextObject() {
      if (this.currentIndex < this.boxes.length - 1) {
        const nextIndex = this.currentIndex + 1;
        this.animateObjects(this.currentIndex, nextIndex);
        this.selectedIndex = this.currentIndex;
        this.currentIndex = nextIndex;
      }
    },
    previousObject() {
      if (this.currentIndex > 0) {
        const prevIndex = this.currentIndex - 1;
        this.animateObjects(this.currentIndex, prevIndex);
        this.selectedIndex = this.currentIndex;
        this.currentIndex = prevIndex;
      }
    },
    animateObjects(currentIndex, targetIndex) {
      const currentBox = this.boxes[currentIndex];
      const targetBox = this.boxes[targetIndex];

      gsap.to(currentBox, {
        x: targetBox.x,
        y: targetBox.y,
        duration: 0.5,
        ease: "Power2.easeInOut",
      });

      gsap.to(targetBox, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "Power2.easeInOut",
      });
    },
  },
};
</script>

<style scoped>
.container {
  position: relative;
  width: 600px;
  height: 200px;
  margin: 0 auto;
}

.box {
  position: absolute;
  top: 0;
  width: 200px;
  height: 200px;
  background-color: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
}

.box h3 {
  font-size: 20px;
}

.current {
  left: calc(50% - 100px);
  z-index: 2;
}

.selected {
  background-color: #f00;
  color: #fff;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background-color: #ccc;
  color: #fff;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.arrow:hover {
  background-color: #999;
}
</style>

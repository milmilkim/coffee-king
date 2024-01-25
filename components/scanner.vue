<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div class="bg-white p-8 rounded shadow-md">
      <button
        @click="closeModal"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        X
      </button>

      <QrcodeStream @detect="onDetect" :track="paintOutline" />
      <!-- <QrcodeDropZone />
      <QrcodeCapture /> -->
      <!-- 닫기 버튼 -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

const emits = defineEmits(['close', 'scan']);

const checkCameraPermission = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ video: true });
  } catch (error) {
    alert('카메라 권한을 주세요. 문제가 지속될시 다른 브라우저를 사용해주세요.');
    closeModal();
  }
};

const paintOutline = (detectedCodes: any, ctx: CanvasRenderingContext2D) => {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

    ctx.strokeStyle = 'red';

    ctx.beginPath();
    ctx.moveTo(firstPoint.x, firstPoint.y);
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y);
    }
    ctx.lineTo(firstPoint.x, firstPoint.y);
    ctx.closePath();
    ctx.stroke();
  }
};

const closeModal = () => {
  emits('close');
};
onMounted(() => {
  checkCameraPermission();
});
const onDetect = (detectedCode: any[]) => {
  emits('scan', detectedCode[0].rawValue);
};
</script>

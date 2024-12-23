<script lang="ts">
  import OtpInput from "$lib/input/otpInput.svelte";

  let otpValue: string[] = [];
  let otpError = '';

  async function verifyOtp() {
      const enteredOtp = otpValue.join('');
      if (enteredOtp !== '123456') { // Пример проверки OTP
          otpError = 'Invalid OTP. Please try again.';
      } else {
          otpError = '';
          alert('OTP verified successfully!');
      }
  }
</script>

<div class="flex items-center justify-center min-h-screen">
  <div class="flex flex-col items-center space-y-4">
    <OtpInput length={6} bind:otp={otpValue} bind:error={otpError} />
    <div class="w-48 text-center">
      <button
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        on:click={verifyOtp}
        disabled={otpValue.join('').length < 6}
      >
        Verify OTP
      </button>
    </div>
  </div>
</div>

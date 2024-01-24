const Share = () => (
    <div class="bg-white border border-gray-200 rounded p-4 mb-6 flex flex-wrap gap-x-3">
        <h3 class="text-sm w-full mb-2">Follow us on:</h3>

        <a href={
            `https://twitter.com/${process.env.TWITTER_USERNAME}`
        } class="w-[30px] h-[30px] rounded-full flex items-center justify-center " target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 24 24" style="enable-background:new 0 0 24 24;" xml:space="preserve"><g><polygon points="12.153992,10.729553 8.088684,5.041199 5.92041,5.041199 10.956299,12.087097 11.59021,12.97345    15.900635,19.009583 18.068909,19.009583 12.785217,11.615906  " /><path d="M21.15979,1H2.84021C1.823853,1,1,1.823853,1,2.84021v18.31958C1,22.176147,1.823853,23,2.84021,23h18.31958   C22.176147,23,23,22.176147,23,21.15979V2.84021C23,1.823853,22.176147,1,21.15979,1z M15.235352,20l-4.362549-6.213013   L5.411438,20H4l6.246887-7.104675L4,4h4.764648l4.130127,5.881958L18.06958,4h1.411377l-5.95697,6.775635L20,20H15.235352z" /></g></svg>
        </a>

       
    </div>
);

export default Share;

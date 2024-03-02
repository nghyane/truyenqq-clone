const AdsenseSlot = ({ className }: { className?: string }): JSX.Element => {
    return (
        <div class={`w-full text-center h-auto ${className}`}>
            <p class="text-gray-500 text-sm p-2">
                Advertisement
            </p>
            {
                `<ins class="adsbygoogle " style="display:block" 
                    data-ad-client="${process.env.ADSENSE_CLIENT}"
                    data-ad-slot="${process.env.ADSENSE_SLOT}"
                    data-ad-format="auto"
                    data-full-width-responsive="true">
                </ins>
            <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
            </script>`}
        </div>
    )
}

export default AdsenseSlot;
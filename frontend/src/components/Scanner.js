import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner() {
    const [scanResult, setScanResult] = useState(null);

    const navigate = useNavigate();

    useEffect(()    => {
        const scanner = new Html5QrcodeScanner("reader", {
        qrbox: {
            width: 500,
            height: 350,
        },
        fps: 5,
        });
    
        scanner.render(success, error);
    
        function success(result) {
            scanner.clear();
            setScanResult(result);
            navigate(`/product/${result}`);
        }
    
        function error(err) {
            console.warn(err);
        }
    }, []);

    return (
        <div>
            { scanResult 
                ? <div>success: <a href={`https://world.openfoodfacts.org/api/v2/product/${scanResult}.json`}>results</a></div>
                : <div id="reader"></div>
            }
            <div id="reader"></div>
        </div>
    );
}

export default Scanner;
package com.example.duocdd.hello;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.TextView;

public class ScrollView extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_scroll_view);

        TextView txtArticle = (TextView) findViewById(R.id.txt_article);
        txtArticle.setText(generateArticle());
    }

    private static String generateArticle(){
        String text = "<b>Start</b>";
        text += "\n<b><i>kaka</i></b>https://www.google.com/";
        for (int i = 0; i < 100; i++) {
            if(i % 10 == 0){
                text += "\n";
            }
            if(i % 20 == 0){
                text += "\n\n";
            }
            text = text + "Duoc Dang Duy ";
        }
        return text;
    }
}

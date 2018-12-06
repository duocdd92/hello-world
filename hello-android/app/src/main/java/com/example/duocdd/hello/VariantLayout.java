package com.example.duocdd.hello;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.TextView;
import android.widget.Toast;

public class VariantLayout extends AppCompatActivity {
    private int count = 0;
    private  TextView txtCount;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_variant_layout);
        txtCount = (TextView)findViewById(R.id.txt_count);
    }

    public void showToast(View view){
        Toast toast = Toast.makeText(this, R.string.toast_message, Toast.LENGTH_SHORT);
        toast.show();
    }

    public void count(View view){
        txtCount.setText(Integer.toString(++this.count));
    }
}

<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductDetailsResource\RelationManagers\DetailRelationManager;
use App\Filament\Resources\ProductDetailsResource\RelationManagers\DetailsRelationManager;
use App\Filament\Resources\ProductImagesResource\RelationManagers\ImagesRelationManager;
use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Group;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Forms\Components\FileUpload;
use Filament\Tables\Columns\ImageColumn;
use Illuminate\Support\Facades\Storage;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $modelLabel = 'Товар';
    protected static ?string $pluralModelLabel = 'Товары';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Grid::make(2)
            ->schema([
                Group::make()
                    ->schema([
                        TextInput::make('name')->required()->maxLength(60)->name('Название'),
                        TextInput::make('price')->numeric()->maxLength(10)->required()->name('Цена'),
                        TextInput::make('quantity')->numeric()->required()->name('Количество'),
                    ]),
                Group::make()
                    ->schema([
                        FileUpload::make('image')
                            ->disk('public')
                            ->directory('products')
                            ->image()
                            ->preserveFilenames()
                            ->maxSize(2048)
                            ->imagePreviewHeight('200')
                            ->downloadable()->name('Изображение'),
                ]),
            ])
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('id')->sortable(),
                TextColumn::make('name')->searchable()->label('Название'),
                TextColumn::make('price')->money('rub', true)->label(label: 'Цена'),
                TextColumn::make('quantity')->label('Количество'),
                ImageColumn::make('image')
                    ->disk('public')
                    ->height(60)
                    ->width(60)
                    ->getStateUsing(fn ($record) => Storage::url($record->image))
                    ->label('Изображение'),
                ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            ImagesRelationManager::class,
            DetailsRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}
